#include "stdafx.h"
#include <iostream>
#include <fstream>
#include <string>

using namespace std;


int prime(int n) {
	int sum = 0;
	int i, j;
	for (i = 2; i <= n; i++) {
		for (j = 2; j <= i; j++) {
			if (i % j == 0)
				break;
		}
		if (j == i) {
			cout << j << endl;
			sum += j;
		}
	}

	return sum;
}

int twenty_five(int max) {
	int i, j, k;
	int max_idx = 0;
	int max_a = 0;
	int max_b = 0;
	int max_prod = 0;

	int quad;
	int prm_idx;
	bool prm_flag;

	for (i = 1 - max; i < max; i++) {
		for (j = 1 - max; j < max; j++) {
			prm_flag = true;
			prm_idx = 0;
			while (prm_flag) {
				quad = ((int) pow(prm_idx, 2)) + i * prm_idx + j;
				for (k = 2; k <= quad; k++) {
					if (quad % k == 0)
						break;
				}
				if (k == quad) {
					prm_idx++;
				} else
					prm_flag = false;
			}

			if (prm_idx > max_idx) {
				max_idx = prm_idx;
				max_a = i;
				max_b = j;
				max_prod = max_a * max_b;
				cout << max_idx << ": " << max_a << " * " << max_b << " = " << max_prod << endl;
			}
		}
	}

	return max_prod;
}


int main() {
	cout << twenty_five(1000) << endl;
	return 0;
}