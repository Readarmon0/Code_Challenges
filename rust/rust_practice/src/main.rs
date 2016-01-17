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