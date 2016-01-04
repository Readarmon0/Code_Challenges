// project_euler_c.cpp : Defines the entry point for the console application.
//

#include "stdafx.h"
#include <iostream>
#include <fstream>
#include <string>

using namespace std;


struct word {
	char * ones;
	int ones_cnt;
	char * tens;
	int tens_cnt;
	char * hund;
	int hund_cnt;
};

struct zero : word {
	char * ones = "";
	int ones_cnt = 0;
	char * tens = "";
	int tens_cnt = 0;
	char * hund = "";
	int hund_cnt = 0;
};

struct one : word {
	char * ones = "one";
	int ones_cnt = 3;
	char * tens = "";
	int tens_cnt = 0;
	char * hund = "onehundred";
	int hund_cnt = 10;
};

struct two : word {
	char * ones = "two";
	int ones_cnt = 3;
	char * tens = "twenty";
	int tens_cnt = 6;
	char * hund = "twohundred";
	int hund_cnt = 10;
};

struct three : word {
	char * ones = "three";
	int ones_cnt = 5;
	char * tens = "thirty";
	int tens_cnt = 6;
	char * hund = "threehundred";
	int hund_cnt = 12;
};

struct four : word {
	char * ones = "four";
	int ones_cnt = 4;
	char * tens = "forty";
	int tens_cnt = 5;
	char * hund = "fourhundred";
	int hund_cnt = 11;
};

struct five : word {
	char * ones = "five";
	int ones_cnt = 4;
	char * tens = "fifty";
	int tens_cnt = 5;
	char * hund = "fivehundred";
	int hund_cnt = 11;
};

struct six : word {
	char * ones = "six";
	int ones_cnt = 3;
	char * tens = "sixty";
	int tens_cnt = 5;
	char * hund = "sixhundred";
	int hund_cnt = 10;
};

struct seven : word {
	char * ones = "seven";
	int ones_cnt = 5;
	char * tens = "seventy";
	int tens_cnt = 7;
	char * hund = "sevenhundred";
	int hund_cnt = 12;
};

struct eight : word {
	char * ones = "eight";
	int ones_cnt = 5;
	char * tens = "eighty";
	int tens_cnt = 6;
	char * hund = "eighthundred";
	int hund_cnt = 12;
};

struct nine : word {
	char * ones = "nine";
	int ones_cnt = 4;
	char * tens = "ninety";
	int tens_cnt = 6;
	char * hund = "ninehundred";
	int hund_cnt = 11;
};

struct teen {
	char * tens = "ten";
	int tens_cnt = 3;
	char * eleven = "eleven";
	int elev_cnt = 6;
	char * twelve = "twelve";
	int twel_cnt = 6;
	char * thirteen = "thirteen";
	int thir_cnt = 8;
	char * fourteen = "fourteen";
	int four_cnt = 8;
	char * fifteen = "fifteen";
	int fift_cnt = 7;
	char * sixteen = "sixteen";
	int sixt_cnt = 7;
	char * seventeen = "seventeen";
	int seve_cnt = 9;
	char * eighteen = "eighteen";
	int eigh_cnt = 8;
	char * nineteen = "nineteen";
	int nine_cnt = 8;
};

int dgt_cnt() {
	int cnt = 0;



	return cnt;
}

int sum() {
	int sum = 0;

	int i;
	for (i = 1; i < 10; i++) {

	}
	for (i = 10; i < 100; i++) {

	}
	for (i = 100; i < 1000; i++) {

	}
	sum += 11;

	return sum;
}

int main() {
	return 0;
}