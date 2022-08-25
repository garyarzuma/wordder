import csv
import string
import random

def check_letters(word):
    if len(word) != 4:
        return False
    for letter in word:
        if letter not in string.ascii_letters:
            return False
    return True

res=[]
with open('esl_forums_word_list.csv', newline='') as csvfile:
    spamreader = csv.reader(csvfile, delimiter=' ')
    for row in spamreader:
        if check_letters(row[0]):
            res.append(row[0])
random.shuffle(res)
for i,word in enumerate(res):
    print(i,word)


