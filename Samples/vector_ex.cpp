#include "stdlib.h"
#include <iostream>
#include <vector>

using namespace std;

int main() {
	int i, j;
	vector< vector<int> > * table = new vector< vector<int> >(16, vector<int>(16));
	for (i = 0; i < 16; i++) {
		for (j = 0; j < 16; j++) {
			table->at(i)[j] = 16 * i + j;
			cout << table->at(i)[j] << " ";
		}
		cout << endl;
	}
}