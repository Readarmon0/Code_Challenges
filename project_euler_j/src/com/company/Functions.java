package com.company;

public class Functions {

    public int remove(int[] x, int n, boolean left) {
        int half = n / 2;
        if (left) {
            for (int i = 0; i < half; i++)
                x[i] = x[2 * i + 1];
        } else {
            for (int i = 0; i < half; i++)
                x[half - i - 1] = x[(n - 2) - (2 * i)];
        }

        if (half == 1)
            return x[0];
        else
            return remove(x, half, !left);
    }

    public int odd_elim(int n) {
        int last = 1;
        int[] x = new int[n];
        for (int i = 0; i < n; i++)
            x[i] = i + 1;
        if (n > 1)
            last = remove(x, n, true);
        return last;
    }

    public int sum(int n) {
        int x = 0;
        for (int i = 1; i <= n; i++)
            x += odd_elim(i);
        return x;
    }

    public int find() {
        return sum(10 ^ 18) % 987654321;
    }

    public void Functions() {

    }

}
