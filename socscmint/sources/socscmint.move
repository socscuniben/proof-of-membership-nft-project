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
    stack: String,
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
    passport_display.add(b"image_url".to_string(), b"<svg width="768" height="768" viewBox="0 0 768 768" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="a" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" style="stop-color:#e52d27;stop-opacity:1"/><stop offset="100%" style="stop-color:#b31217;stop-opacity:1"/></linearGradient></defs><rect x="96" y="76" width="576" height="616" rx="64" fill="#fff"/><path d="M96 76h576a64 64 0 0 1 64 64v116a64 64 0 0 1-64 64H96a64 64 0 0 1-64-64V140a64 64 0 0 1 64-64" fill="url(#a)"/><circle cx="384" cy="320" r="90" fill="#fff"/><image x="299" y="235" width="170" height="170" clip-path="url(#profileClip)" href="https://walrus.tusky.io/j0RFnuOuqA16zegDr9tkHSxcb5FWZ8R6CaHObnvsLxE" style="clip-path:circle(85px at center)"/><text x="384" y="440" text-anchor="middle" font-size="32" font-weight="bold" font-family="Arial">{name}</text><text x="384" y="480" text-anchor="middle" font-size="20" font-weight="bold" fill="#333" font-family="Arial">{stack}</text><path stroke="#b31217" stroke-width="3" d="M250 500h268"/><text x="384" y="530" text-anchor="middle" font-size="16" fill="#444" font-family="Arial">{description}</text></svg>".to_string());
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