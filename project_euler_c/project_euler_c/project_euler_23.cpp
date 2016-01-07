#include "stdafx.h"
#include <iostream>
#include <fstream>
#include <string>

using namespace std;


bool abundant(int * amic_sums, int i) {
	return amic_sums[i] > i;
}

int sum_amic(int num) {
	int i, j, k;

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

	

	return sum;
}

int main() {
	cout << sum_amic(28123) << endl;
	return 0;
}