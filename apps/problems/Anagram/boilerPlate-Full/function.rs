
  use std::io::{self, BufRead};
  
  ##USER_CODE_HERE##
  
  fn main() {
    let stdin = io::stdin();
    let mut input = stdin.lock().lines().map(|l| l.unwrap());
    let s1: unknown = input.next().unwrap().parse().unwrap();
  let s2: unknown = input.next().unwrap().parse().unwrap();
    let result = areAnagrams(s1, s2);
    println!("{}", result);
  }
      