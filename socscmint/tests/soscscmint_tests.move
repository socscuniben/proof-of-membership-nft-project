
#[test_only]
module soscscmint::soscscmint_tests;
// uncomment this line to import the module
use soscscmint::soscscmint:: ;

const ENotImplemented: u64 = 0;

#[test]
fun test_soscscmint() {
    // pass
}

#[test, expected_failure(abort_code = ::soscscmint::soscscmint_tests::ENotImplemented)]
fun test_soscscmint_fail() {
    abort ENotImplemented
}

