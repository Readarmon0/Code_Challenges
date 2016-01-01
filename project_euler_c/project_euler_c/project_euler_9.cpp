#include "stdafx.h"
#include <iostream>

using namespace std;


int main() {
	int i, j, k;
	for (i = 1; i < 998; i++) {
		for (j = 1; j < 999 - i; j++) {
			if (pow(i, 2) + pow(j, 2) == pow(1000 - i - j, 2))
				cout << i << "^2 + " << j << "^2 = " << (1000 - i - j) << "^2" << endl;
		}
	}
	return 0;
}