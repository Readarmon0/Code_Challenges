#include "stdafx.h"
#include <iostream>

using namespace std;


int sumsquare(int n) {
	int i;
	int * squares = new int[100];
	for (i = 1; i <= n; i++) {
		squares[i - 1] = i * i;
	}

	int sum = 0;
	for (i = 0; i < n; i++) {
		sum += squares[i];
	}
	return sum;
}

int squaresum(int n) {
	int sum = 0;
	for (int i = 1; i <= n; i++) {
		sum += i;
	}
	return sum * sum;
}

int main() {
	int x = squaresum(100);
	int y = sumsquare(100);
	cout << x - y << endl;
	return 0;
}