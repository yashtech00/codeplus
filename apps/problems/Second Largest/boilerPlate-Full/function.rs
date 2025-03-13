
  use std::io::{self, BufRead};
  
  ##USER_CODE_HERE##
  
  fn main() {
    let stdin = io::stdin();
    let mut input = stdin.lock().lines().map(|l| l.unwrap());
    let n: i32 = input.next().unwrap().parse().unwrap();
    let result = getSecondLargest(n);
    println!("{}", result);
  }
      