#include "stdafx.h"
#include <iostream>
#include <fstream>
#include <string>

using namespace std;


int sum_amic(int num) {
	int i, j;

	int sum;
	int * amic_sums = new int[num - 1];
	for (i = 1; i < num; i++) {
		sum = 0;
		for (j = 1; j <= sqrt(i); j++) {
			if (i % j == 0) {
				if (j != sqrt(i))
					sum += j + (i / j);
				else
					sum += j;
			}
		}
		amic_sums[i] = sum - i;
	}

	for (i = 1; i < num; i++) {
		cout << amic_sums[i] << endl;
	}
	cout << endl;

	sum = 0;
	for (i = 2; i < num; i++) {
		if (amic_sums[i] > num) {
			sum += amic_sums[i];
			cout << i << endl;
		}
	}
	cout << endl;

	return sum;
}

int main() {
	cout << sum_amic(10000) << endl;
	return 0;
}