#include "stdafx.h"
#include <iostream>
#include <fstream>
#include <string>

using namespace std;


int fibonacci(int max) {
	int index = 1;
	int i, j;

	int * x = new int[1000];
	int * y = new int[1000];
	int * temp = new int[1000];
	x[0] = 1;
	y[0] = 1;
	temp[0] = 0;
	for (i = 1; i < 1010; i++) {
		x[i] = 0;
		y[i] = 0;
		temp[0] = 0;
	}


	temp[i] = x[i - 1] + x[i - 2];

	while (y[max - 1] == 0) {
		temp[0] = x[0] + y[0];
		for (i = 1; i < 1000; i++) {
			temp[i] = x[i] + y[i] + temp[i - 1] / 10;
		}
		for (i = 0; i < 1000; i++) {
			x[i] = y[i];
			y[i] = temp[i] % 10;
			// cout << y[i];
		}
		// cout << y[i] << endl;

		index++;
	}

	// cout << endl;
	return index;
}

int main() {
	cout << fibonacci(1000) << endl;
	return 0;
}