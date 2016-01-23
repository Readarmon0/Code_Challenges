use std::io::{BufRead, BufReader, Read, stdin};

fn main() {
	let measurements = read_measurements(stdin());
	produce_output(&calculate_results(&measurements));
}

struct Results {
	mean:  f64,
	above: usize,
	below: usize,
}

fn read_measurements<R: Read>(reader: R) -> Vec<f64> {
	let mut measurements: Vec<f64> = vec![]; // Vec::new()
	let mut lines = BufReader::new(reader).lines();

	while let Some(Ok(line)) = lines.next() {
		if line == "999" { break }

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
		mean:  m,
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