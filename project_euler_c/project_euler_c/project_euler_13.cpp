#include "stdafx.h"
#include <iostream>
#include <fstream>
#include <string>

using namespace std;


int main() {
	double * tokens = new double[100];
	int i = 1;

	string line;
	ifstream myfile("example_13.txt");
	char * cstr = new char[line.length() + 1];
	if (myfile.is_open()) {
		while (getline(myfile, line)) {
			strcpy_s(cstr, line.length() + 1, line.c_str());
			tokens[i] = stod(cstr);
			i++;
		}
		myfile.close();
	}

	double sum = 0;
	for (i = 1; i <= 100; i++) {
		sum += tokens[i];
	}
	cout << sum << endl;

	return 0;
}