#include "stdafx.h"
#include <iostream>

using namespace std;


int spn() {
	int i;
	int min = 20;
	bool divis20 = true;
	while (divis20) {
		min++;
		divis20 = false;
		for (i = 1; i < 21; i++) {
			if ((min % i) != 0)
				divis20 = true;
		}
	}

	return min;
}

int main() {
	cout << spn() << endl;
	return 0;
}