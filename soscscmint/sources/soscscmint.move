module soscscmint::soscscmint;

use sui::display;
public SOCSCUnibenPass key, store {
    id: UID,
    name: string,
    description: string,
    level: u64,
    number: u64,
    image_url: Url
}

public PassportMinted has key, store {
    owner: address,
    name: string,
    time_mnted: &Clock
}

public MintedRegistry has key, store {
    no_of_nfts_minted: u64
}

public struct SOCSCMINT has drop {}
public fun init(otw: SOCSCMINT, ctx: &mut TxContext) {
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
        no_of_nfts_minted: 0
    }

    transfer::public_transfer(publisher, ctx.sender());
    transfer::share_object(mint_registry);

}

public fun mint(name: string, description: string, mintregistry: &mut MintedRegistry) {

}