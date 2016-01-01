package com.company;

public class Main {

   /*
   public static void main(String[] args) {
	// write your code here
        Functions f = new Functions();
        for (int index = 1; index <= 10; index++)
            System.out.println(f.odd_elim(index));
        System.out.println(f.odd_elim(1000));
        System.out.println(f.sum(1000));
        System.out.println(f.find());
        return;
    }
    */

    /*
    public static int getNthDigit(int number, int n) {
        return (int) ((number / Math.pow(10, n)) % 10);
    }

    public static int palindrome() {
        int i, j, k;
        int max = 0;
        for (i = 999; i > 0; i--) {
            for (j = 999; j > 0; j--) {
                int ij = i * j;
                int x = ij;
                int x_count = 0;
                int[] p = new int[6];
                while(x != 0) {
                    p[x_count] = getNthDigit(x, 0);
                    x /= 10;
                    x_count++;
                }

                boolean x_break = false;
                for (k = 0; k < (x_count / 2); k++) {
                    if (p[k] != p[x_count - k - 1]) {
                        x_break = true;
                    }
                }
                if (x_break == false && ij > max)
                    max = ij;
            }
        }

        return max;
    }

    public static void main(String[] args) {
        System.out.println(palindrome());
    }
    */

    public static void main(String[] args) {

    }
}