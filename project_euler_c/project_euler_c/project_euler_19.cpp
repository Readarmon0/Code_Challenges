#include "stdafx.h"
#include <iostream>
#include <fstream>
#include <string>

using namespace std;


int jan_sun_cnt(int day) {
	int sun_cnt = 0;
	int i, j, k;

	int current = day + 365;

	for (i = 1; i <= 100; i++) {
		for (j = 1; j <= 12; j++) {
			if (j == 3 || j == 5 || j == 7 ||
				j == 8 || j == 10 || j == 12) {
				for (k = 0; k < 31; k++)
					current++;
			}
			else if (j == 4 || j == 6 || j == 9 || j == 11) {
				for (k = 0; k < 30; k++)
					current++;
			}
			else if (j == 1) {
				for (k = 0; k < 31; k++) {
					current++;
					if (current % 7 == 0)
						sun_cnt++;
				}
			}
			else {
				if (i % 4 != 0) {
					for (k = 0; k < 28; k++)
						current++;
				}
				else {
					for (k = 0; k < 29; k++)
						current++;
				}
			}
		}
	}

	return sun_cnt;
}

int main() {
	cout << jan_sun_cnt(1) << endl;
	return 0;
}