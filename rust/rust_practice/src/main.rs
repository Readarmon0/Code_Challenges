use std::thread;
use std::sync::Arc;
use std::sync::Mutex;

fn main() {
    let v = Arc::new(Mutex::new(vec![1, 2, 3, 4, 5]));

    let mut handles = vec![];

    for i in 0..5 {
        let mutex = v.clone();

        let handle = thread::spawn(move || {
            let mut v = mutex.lock().unwrap();

            v[i] = v[i] + 1;

            println!("{:?}", v[i]);
        });

        handles.push(handle);
    }

    for handle in handles {
        handle.join().unwrap();
    }
}
/*
fn main() {
    let mut x: Box<Vec<i32>> = Box::new(Vec::new());
    for i in 1..6 {
        x.push(i);
    }

    println!("Hello world!");

    for i in 0..5 {
        println!("The value of x is: {}", x[i]);
    }
}
*/
/////////////////////////////////////////////////////////////////////////

/*
fn plus_one(i: i32) -> i32 {
    i + 1
}

// without type inference
let f: fn(i32) -> i32 = plus_one;

// with type inference
let f = plus_one;

let six = f(5);
*/

/*
fn main() {
    let x = 5; // x: i32

    let (x, y) = (1, 2);

    let x: i32 = 5;

    let x = 5;
    x = 10;

    let mut x = 5; // mut x: i32
    x = 10;
}

fn main() {
    let x: i32;

    println!("Hello world!");

    println!("The value of x is: {}", x);
}

fn main() {
    let x: i32 = 17;
    {
        let y: i32 = 3;
        println!("The value of x is {} and value of y is {}", x, y);
    }
    println!("The value of x is {} and value of y is {}", x, y); // This won't work

    let x: i32 = 8;
    {
        println!("{}", x); // Prints "8"
        let x = 12;
        println!("{}", x); // Prints "12"
    }
    println!("{}", x); // Prints "8"
    let x = 42;
    println!("{}", x); // Prints "42"

    let mut x: i32 = 1;
    x = 7;
    let x = x; // x is now immutable and is bound to 7

    let y = 4;
    let y = "I can also be bound to text!"; // y is now of a different type
}
*/



/*
extern crate getopts;
extern crate rustc_serialize;

use getopts::Options;
use std::env;

fn print_usage(program: &str, opts: Options) {
    println!("{}", opts.usage(&format!("Usage: {} [options] <city>", program)));
}

fn main() {
    let args: Vec<String> = env::args().collect();
    let program = args[0].clone();

    let mut opts = Options::new();
    opts.optopt("f", "file", "Choose an input file, instead of using STDIN.", "NAME");
    opts.optflag("h", "help", "Show this usage message.");

    let matches = match opts.parse(&args[l..]) {
        Ok(m) => { m }
        Err(e) => { panic!(e.to string()) }
    };

    if matches.opt_present("h") {
        print_usage(&program, opts);
        return;
    }

    let data_path = args[1].clone();

    let file = matches.opt_str("f");
    let date_file = file.as_ref().map(Path::new);

    let city = if !matches.free.is_empty() {
        matches.free[0].clone()
    } else {
        print_usage(&program, opts);
        return;
    };

    for pop in search(&data_file, &city) {
        println!("{}, {}: {:?}", pop.city, pop.country, pop.count);
    }

    // Do stuff with information
}

#[derive(Debug, RustcDecodable)]
struct Row {
    country: String,
    city: String,
    accent_city: String,
    region: String,

    population: Option<u64>,
    latitude: Option<f64>,
    longitude: Option<f64>,
}

struct PopulationCount {
    city: String,
    country: String,
    // This is not longer an "Option" because values of this type are only
    // constructed if they have a population count.
    count: u64,
}

fn print_usage(program: &str, opts: Options) {
    println!("{}", opts.usage(&format!("Usage: {} [options] <data-path> <city>", program)));
}

fn search<P: AsRef<Path>>(file_path: P, city: &str) -> Result<Vec<PopulationCount>, Box<Error + Send + Sync>> {
    let mut found = vec![];
    let file = fs::File::open(file_path).unwrap();
    let mut rdr = csv::Reader::from_reader(file);
    for row in rdr.decode::<Row>() {
        let row = try!(row);
        match row.population {
            None => { } // skip it
            Some(count) => if row.city == city {
                found.push(PopuationCount {
                    city: row.city,
                    country: row.country,
                    count: count,
                });
            },
        }
    }
    if found.is_empty() {
        Err(From::from("No matching cities with a population were found."))
    } else {
        Ok(found)
    }
}

fn main() {
    let args: Vec<String> = evn::args().collect();
    let program = args[0].clone();

    let mut opts = Options::new();
    opts.optflag("h", "help", "Show this usage message.");

    let matches = match opts.parse(&args[l..]) {
        Ok(m)  => { m }
        Err(e) => { panic!(e.to_string()) }
    };

    if matches.opt_present("h") {
        print_usage(&program, opts);
        return;
    }

    let data_file = args[l].clone();
    let data_path = Path::new(&data_file);
    let city = args[2].clone();
    for pop in search(&data_path, &city) {
        println!("{}, {}: {:?}", pop.city, pop.country, pop.count);
    }
}
*/

/*
fn main() {
    let file_name = "foobar.rs";
    match find(file_name, '.') {
        None => println!("No file extension found."),
        Some(i) => println!("File extension: {}", &file_name[i + 1..]),
    }
}

// Returns the extension of the given file name, where the extension is defined
// as all characters proceeding the first
// If 'file_name' has no '.', then 'None' is returned.
fn extension_explicit(file_name: &str) -> Option<&str> {
    match find(file_name, '.') {
        None => None,
        Some(i) => Some(&file_name[i + 1..]),
    }
}

fn map<F, T, A>(option: Option<T>, f: F) -> Option<A> where F: FnOnce(t) -> A {
    match option {
        None => None,
        Some(value) => Some(f(value)),
    }
}

// Returns the extension of the given file name, where the extension is defined
// as all characters proceeding the first `.`.
// If `file_name` has no `.`, then `None` is returned.
fn extension(file_name: &str) -> Option<&str> {
    find(file_name, '.').map(|i| &file_name[i + 1..])
}

fn unwrap_or<T>(option: Option<T>, default: T) -> T {
    match option {
        None => default,
        Some(value) => value,
    }
}

fn main() {
    assert_eq!(extension("foobar.csv").unwrap_or("rs"), "csv");
    assert_eq!(extension("foobar").unwrap_or("rs"), "rs");
}

fn file_path_ext_explicit(file_path: &str) -> Option<&str> {
    match file_name(file_path) {
        None => None,
        Some(name) => match extension(name) {
            None => None,
            Some(ext) => Some(ext),
        }
    }
}

fn file_name(file_path: &str) -> Option<&str> {
    // implementation elided
    unimplemented!()
}

fn and_then<F, T, A>(option: Option<T>, f: F) -> Option<A> where F: FnOnce(T) -> Option<A> {
    match option {
        None => None,
        Some(value) => f(value),
    }
}

fn file_path_ext(file_path: &str) -> Option<&str> {
    file_name(file_path).and_then(extension)
}

use std::num::ParseIntError;
use std::result;

type Result<T> = result::Result<T, ParseIntError>;

fn double_number(number_str: &str) -> Result<i32, ParseIntError> {
    number_str.parse::<i32>().map(|n| 2 * n)
}

fn main() {
    match double_number("10") {
        Ok(n) => assert_eq!(n, 20);
        Err(err) => println!("Error: {:?}", err),
}
*/

/*
use std::env;

fn main() {
    let mut argv = env::args();
    let arg: String = argv.nth(1).unwrap(); // error 1
    let n: i32 = arg.parse().unwrap(); // error 2
    println!("{}", 2 * n);
}
*/

/*
// Guess a number between 1 and 10.
// If it matches the number we had in mind, return true. Else, return false.
fn guess(n: i32) -> bool {
    if n < 1 || n > 10 {
        panic!("Invalid number: {}", n);
    }
    n == 5
}

fn main() {
    guess(11);
}
*/

/*
use std::io::{BufRead, BufReader, Read, stdin};

fn main() {
    let measurements = read_measurements(stdin());
    produce_output(&calculate_results(&measurements));
}

struct Results {
    mean: f64,
    above: usize,
    below: usize,
}

fn read_measurements<R: Read>(reader: R) -> Vec<f64> {
    let mut measurements: Vec<f64> = vec![]; // Vec::new()
    let mut lines = BufReader::new(reader).lines();

    while let Some(Ok(line)) = lines.next() {
        if line == "999" {
            break
        }

        if let Ok(f) = line.parse() {
            if f >= 0.0 {
                measurements.push(f);
            }
        }
    }

    return measurements;
}

#[cfg(test)]
mod read_measurements_test {
    use super::{read_measurements};
    use std::io::{Read, Result};

    #[test]
    fn reads_three_measurements() {
        assert_read(&[3., 4., 5.], "3\n4\n5\n");
    }

    #[test]
    fn discards_negative() {
        assert_read(&[3., 4., 5.], "3\n4\n-6\n5\n");
    }

    #[test]
    fn discards_noise() {
        assert_read(&[3., 4., 5.], "3\n4\nsix\n5\n");
    }

    #[test]
    fn stops_at_999() {
        assert_read(&[3., 4.], "3\n4\n999\n5\n");
    }

    fn assert_read(expected: &[f64], input: &str) {
        let mock_read = StringReader::new(input.to_owned());
        let measurements = read_measurements(mock_read);
        assert_eq!(expected.to_owned(), measurements);
    }

    struct StringReader {
        contents: Vec<u8>,
        position: usize,
    }

    impl StringReader {
        fn new(s: String) -> Self {
            StringReader {
                contents: s.into_bytes(),
                position: 0,
            }
        }
    }

    impl Read for StringReader {
        fn read(&mut self, buf: &mut [u8]) -> Result<usize> {
            let mut count = 0;

            while self.position < self.contents.len() && count < buf.len() {
                buf[count] = self.contents[self.position];
                count += 1;
                self.position += 1;
            }

            return Ok(count);
        }
    }
}

fn calculate_results(fs: &[f64]) -> Results {
    let m = mean(fs);
    let b = fs.iter().filter(|&&x| m - 5.0 <= x && x < m).count();
    let a = fs.iter().filter(|&&x| m < x && x <= m + 5.0).count();

    Results {
        mean: m,
        above: a,
        below: b,
    }
}

fn mean(samples: &[f64]) -> f64 {
    sum(samples) / (samples.len() as f64)
}

fn sum(samples: &[f64]) -> f64 {
    samples.iter().fold(0.0, |a, b| a + *b)
}

#[cfg(test)]
mod sum_tests {
    use super::sum;

    #[test]
    fn sum_empty_is_0() {
        assert_eq!(0.0, sum(&[]));
    }

    #[test]
    fn sum_1_2_3_4_is_10() {
        assert_eq!(10.0, sum(&[1., 2., 3., 4.]));
    }
}

fn produce_output(r: &Results) {
    if r.mean.is_nan() {
        println!("No measurements provided.");
    } else {
        println!("Mean rainfall: {} cm", r.mean);
        println!("Below count:   {}", r.above);
        println!("Above count:   {}", r.below);
    }
}
*/

// cargo new hello_world --bin
// cargo build
// cargo run

/*
extern crate rand;

use std::io;
use std::cmp::Ordering;
use rand::Rng;

fn main() {
    /*
    double mean = 0;
    double bcnt = 0;
    double acnt = 0;
    println!("Mean rainfall: %d cm", mean);
    println!("Below count:   %d", bcnt);
    println!("Above count:   %d", acnt);
    */

    println!("Guess the number!");

    let secret_number = rand::thread_rng().gen_range(1, 101);

    // println!("The secret number is {}", secret_number);

    loop {
        println!("Please input your guess.");

        let mut guess = String::new();

        io::stdin().read_line(&mut guess)
            .ok()
            .expect("Failed to read line");

        let guess: u32 = match guess.trim().parse() {
            Ok(num) => num,
            Err(_) => continue,
        };

        println!("You guessed: {}", guess);

        match guess.cmp(&secret_number) {
            Ordering::Less    => println!("Too small!"),
            Ordering::Greater => println!("Too big!"),
            Ordering::Equal   => {
                println!("You win!");
                break;
            }
        }
    }
}
*/

/*
use std::thread;
use std::sync::{Mutex, Arc};


struct Philosopher {
    name: String,
    left: usize,
    right: usize,
}

impl Philosopher {
    fn new(name: &str, left: usize, right: usize) -> Philosopher {
        Philosopher {
            name: name.to_string(),
            left: left,
            right: right,
        }
    }

    fn eat(&self, table: &Table) {
        let _let = table.forks[self.left].lock().unwrap();
        thread::sleep_ms(150);
        let _right = table.forks[self.right].lock().unwrap();

        println!("{} is eating.", self.name);

        thread::sleep_ms(1000);

        println!("{} is done eating.", self.name);
    }
}

struct Table {
    forks: Vec<Mutex<()>>,
}

fn main() {
    let table = Arc::new(Table { forks: vec![
        Mutex::new(()),
        Mutex::new(()),
        Mutex::new(()),
        Mutex::new(()),
        Mutex::new(()),
    ]});

    let philosophers = vec![
        Philosopher::new("Judith Butler", 0, 1),
        Philosopher::new("Gilles Deleuze", 1, 2),
        Philosopher::new("Karl Marx", 2, 3),
        Philosopher::new("Emma Goldman", 3, 4),
        Philosopher::new("Michel Foucault", 0, 4),
    ];

    let handles: Vec<_> = philosophers.into_iter().map(|p| {
        let table = table.clone();

        thread::spawn(move || {
            p.eat(&table);
        })
    }).collect();

    for h in handles {
        h.join().unwrap();
    }
}
*/


/*
let mut range = 0..10;

loop {
    match range.next() {
        Some(x) => {
            println!("{}", x);
        },
        None => { break }
    }
}

let nums = vec![1, 2, 3];

for num in &nums {
    println!("{}", *num);
}

let one_to_one_hundred = (1..101).collect::<Vec<_>>();

let greater_than_forty_two = (0..100).find(|x| *x > 42);

match greater_than_forty_two {
    Some(_) => println!("Found a match!"),
    None => println!("No match found :("),
}

let sum = (1..4).fold(0, |sum, x| sum + x);

let nums = 1..100;

let nums = (1..100).collect::<Vec<i32>>();

(1..100).map(|x| println!("{|", x));

for i in (1..).take(5) {
    println!("{}", i);
}

for i in (1..100).filter(|&x| x % 2 == 0) {
    println!("{}", i);
}

(1..)
    .filter(|&x| x % 2 == 0)
    .filter(|&x| x % 3 == 0)
    .take(5)
    .collect::<Vec<i32>>();
*/

/*
use std::sync::{Arc, Mutex};
use std::thread;

fn main() {
    let mut data = Arc::new(vec![1, 2, 3]);

    for i in 0..3 {
        let data = data.clone();
        thread::spawn(move || {
            let mut data = data.lock().upwrap();
            data[i] += 1;
        });
    }

    thread::sleep_ms(50);
}
*/

/*
use std::sync::{Arc, Mutex};
use std::thread;
use std::sync::mpsc;

fn main() {
    let data = Arc::new(Mutex::new(0));

    let (tx, rx) = mpsc::channel();

    for _ in 0..10 {
        let (data, tx) = (data.clone(), tx.clone());

        thread::spawn(move || {
            let mut data = data.lock().unwrap();
            *data += 1;

            tx.send(());
        });
    }

    for _ in 0..10 {
        rx.recv();
    }
}
*/

/*
use std::thread;
use std::sync::mpsc;

fn main() {
    let (tx, rx) = mpsc::channel();

    for i in 0..10 {
        let tx = tx.clone();

        thread::spawn(move || {
            let answer = i * i;

            tx.send(answer);
        });
    }

    for _ in 0..10 {
        println!("{}", rx.recv().unwrap());
    }
}
*/

/*
use std::thread;

let handle = thread::spawn(move || {
    panic!("oops!");
});

let result = handle.join();

assert!(result.is_err());
*/