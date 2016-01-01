#include "stdafx.h"
#include <iostream>

using namespace std;


int multiple(int i) {
	if ((i % 3) == 0 || (i % 5) == 0)
		return i;
	else
		return 0;
}

int sum() {
	int x = 0;
	for (int i = 0; i < 1000; i++)
		x += multiple(i);
	return x;
}

int main() {
	cout << sum() << endl;
	return 0;
}