#include "stdafx.h"
#include <iostream>

using namespace std;


double sumprime(double n) {
	double sum = 0.0;
	double i, j;
	for (i = 2.0; i <= n; i++) {
		for (j = 2.0; j <= i; j++) {
			if (fmod(i, (double)j) == 0.0)
				break;
		}
		if (j == i) {
			cout << j << endl;
			sum += j;
		}
	}

	return sum;
}



int main() {
	cout << sumprime(10000) << endl;
	return 0;
}