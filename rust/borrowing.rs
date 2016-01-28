pub fn inc_vec(mut v: Vec<usize>, ix: usize) {
v[ix] += 1;
}
#[test]
fn test_inc_vec() {
let expected = vec![ 3, 4, 6 ];
let actual = vec![ 3, 4, 5 ];
inc_vec(actual, 2);
assert_eq!(expected, actual); // Error! actual has been moved
}

pub fn inc_vec(mut v: Vec<usize>, ix: usize) −> Vec<usize> {
v[ix] += 1;
v
}
#[test]
fn test_inc_vec() {
let expected = vec![ 3, 4, 6 ];
let mut actual = vec![ 3, 4, 5 ];
actual = inc_vec(actual, 2);
assert_eq!(expected, actual);
}

pub fn inc_vec(v: &mut [usize], ix: usize) {
v[ix] += 1
}
#[test]
fn test_inc_vec() {
let expected = vec![ 3, 4, 6 ];
let mut actual = vec![ 3, 4, 5 ];
inc_vec(&mut actual, 2);
assert_eq!(expected, actual);
}

let mut x = SomeObject::new();
{
let r1 = &x;
let r2 = &x;
let r3 = r1;
let r4 = &mut x; // error!
}
{
let r5 = &mut x; // ok
let r6 = &x; // error!
}
