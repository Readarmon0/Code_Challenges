#include "stdafx.h"
#include <iostream>

using namespace std;


int sum(int * x, int i) {
	int sum = 0;
	for (int j = 0; j < i; j++) {
		if (x[j] % 2 == 0)
			sum += x[j];
	}

	return sum;
}

int fibonacci(int max) {
	int * x = new int[50];
	x[0] = 1;
	x[1] = 2;
	int i = 2;
	while (x[i - 1] < max) {
		x[i] = x[i - 1] + x[i - 2];
		cout << x[i] << endl;
		i++;
	}

	return sum(x, i);
}

int main() {
	cout << endl << fibonacci(4000000) << endl;
	return 0;
}