#include "stdafx.h"
#include <iostream>

using namespace std;


int prime(double num) {
	int x = 0;
	int i = (int) sqrt(num);
	for (int j = i; j > 1; j--) {
		if (fmod(num, (double) j) == 0.0) {
			bool x_break = true;
			for (int k = 2; k < j; k++) {
				if (j % k == 0)
					x_break = false;
			}
			if (x_break)
				return j;
		}
	}
	return -1;
}

int main() {
	double num = 600851475143;
	int p = prime(num);
	cout << p << endl;
	return 0;
}