#include "stdafx.h"
#include <iostream>
#include <fstream>
#include <string>

using namespace std;


int digit_sum() {
	int i, j;
	int * digits = new int[320];
	digits[1] = 1;
	for (i = 2; i <= 320; i++)
		digits[i] = 0;

	for (i = 2; i <= 100; i++) {
		digits[1] = digits[1] * i;
		for (j = 2; j <= 320; j++) {
			digits[j] = digits[j] * i + digits[j - 1] / 10;
		}
		for (j = 1; j <= 320; j++) {
			digits[j] = digits[j] % 10;
			cout << digits[j];
		}
		cout << endl;
	}

	int sum = 0;
	for (i = 1; i <= 320; i++) {
		sum += digits[i];
	}

	return sum;
}

int main() {
	cout << digit_sum() << endl;
	return 0;
}