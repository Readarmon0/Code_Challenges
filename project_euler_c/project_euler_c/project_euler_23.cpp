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

	int * abun = new int[7000];
	int cnt = 1;

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
		if (amic_sums[i] > i) {
			abun[cnt] = i;
			cnt++;
			// cout << i << " " << amic_sums[i] << endl;
		}
	}
	cout << endl;

	sum = 0;
	bool abun_sum;
	for (i = 1; i <= num; i++) {
		abun_sum = false;
		for (j = 1; j <= 13929; j++) {
			if (abun[j] > i)
				break;
			for (k = j + 1; k <= 13930; k++) {
				if (abun[k] > i)
					break;
				if (abun[j] + abun[k] == i) {
					abun_sum = true;
					// cout << abun[j] << " + " << abun[k] << " = " << i << endl;
					break;
				}
			}
			if (abun_sum)
				break;
		}
		if (!abun_sum) {
			sum += i;
			// cout << i << " " << sum << endl;
		}
	}

	return sum;
}

int main() {
	cout << sum_amic(28123) << endl;
	return 0;
}