module socscmint::socscmint;
use sui::package;
use sui::display;
use sui::event;
use sui::clock::{Clock};
use std::string::String;
public struct SOCSCMINT has drop {}
public struct SOCSCUnibenPass has key, store {
    id: UID,
    name: String,
    description: String,
    level: u64,
    number: u64,
}

public struct PassportMinted has copy, drop {
    owner: address,
    name: String,
    time_minted: u64,
}

public struct MintedRegistry has key, store {
    id: UID,    
    no_of_nfts_minted: u64,
}



fun init(
    otw: SOCSCMINT, 
    ctx: &mut TxContext
) {
    let publisher = package::claim(otw, ctx);
    let mut passport_display = display::new<SOCSCUnibenPass>(&publisher, ctx);
    passport_display.add(b"name".to_string(), b"SOCSCUnibenPass#{number}".to_string());
    passport_display.add(b"description".to_string(), b"A NFT signifying memebership of SOCSC Uniben".to_string());
    passport_display.add(b"number".to_string(), b"{number}".to_string());
    passport_display.add(b"level".to_string(), b"{level}".to_string());
    passport_display.add(b"image_url".to_string(), b"A NFT signifying memebership of SOCSC Uniben".to_string());
    passport_display.update_version();
    transfer::public_transfer(passport_display, ctx.sender());


    let mint_registry = MintedRegistry {
        id: object::new(ctx),
        no_of_nfts_minted: 0
    };

    transfer::public_transfer(publisher, ctx.sender());
    transfer::share_object(mint_registry);

}
#[allow(lint(self_transfer))]
public fun mint(name: String, description: String, mintregistry: &mut MintedRegistry, clock: &Clock, ctx: &mut TxContext) {
    let  passport = SOCSCUnibenPass {
        id: object::new(ctx),
        name: name,
        description: description,
        level: 0,
        number: mintregistry.no_of_nfts_minted + 1
    };

    let passport_minted = PassportMinted {
        owner: ctx.sender(),
        name: passport.name,
        time_minted: clock.timestamp_ms()
    };
    event::emit(passport_minted);

    mintregistry.no_of_nfts_minted + 1;
    transfer::public_transfer(passport, ctx.sender());
    
}