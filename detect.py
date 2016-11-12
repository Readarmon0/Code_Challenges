""" parsing.py : parse and deparse s-expressions """

#pylint: disable=I0011,W0105
# import unittest


SYMBOL = str          # A Scheme Symbol is implemented as a Python str
LIST = list           # A Scheme List is implemented as a Python list
NUMBER = (int, float) # A Scheme Number is implemented as a Python int or float

def tokenize(chars):
    "Convert a string of characters into a list of tokens."
    return chars.split()

def parse(program):
    "Read a Scheme expression from a string."
    return read_from_tokens(tokenize(program))

def read_from_tokens(tokens):
    "Read an expression from a sequence of tokens."
    if len(tokens) == 0:
        raise SyntaxError('unexpected EOF while reading')
    if isinstance(tokens, list):
        lst = []
        while len(tokens) != 0:
            lst.append(read_from_tokens(tokens[0]))
            tokens.pop(0)
        return lst
    else:
        return atom(tokens)

def atom(token):
    "Numbers become numbers; every other token is a symbol."
    try:
        return int(token)
    except ValueError:
        try:
            return float(token)
        except ValueError:
            return SYMBOL(token)

with open("text_file.txt", 'r') as arg1:
    parsed = parse(arg1.read())
    sorted = sorted(list(set(parsed)))
    not_detected = []
    for i in range(1,21):
        if i not in sorted:
            not_detected.append(i)
    print not_detected