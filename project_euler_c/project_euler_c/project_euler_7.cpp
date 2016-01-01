#include "stdafx.h"
#include <iostream>

using namespace std;


double prime(int n)
{
	int i = 0, j;
	double ii = 2.0;
	double * x = new double[10000];

	while (i <= n) {
		for (j = 2; j <= ii; j++) {
			if (fmod(ii, (double)j) == 0.0)
				break;
		}
		if (j == ii) {
			x[i] = j;
			i++;
		}
		ii += 1.0;
	}

	return x[n];
}

int main() {
	cout << prime(10000) << endl;
	return 0;
}