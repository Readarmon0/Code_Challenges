#include "stdafx.h"
#include <iostream>
#include <fstream>
#include <string>

using namespace std;


int sum() {
	int i, j;
	int * digits = new int[320];
	digits[1] = 1;
	for (i = 2; i <= 320; i++)
		digits[i] = 0;

	for (i = 1; i <= 1000; i++) {
		digits[1] = digits[1] * 2;
		for (j = 2; j <= 320; j++) {
			digits[j] = digits[j] * 2 + digits[j - 1] / 10;
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
	cout << sum() << endl;
	return 0;
}