import string
import redis
import math

# Dictionary with frequencies of english letters in english laguage
english_freqs = [0.08167, 0.01492, 0.02782, 0.04253, 0.12702, 0.02228, 0.02015, 0.06094, 0.06966, 0.00153, 0.00772, 0.04025, 0.02406,
	0.06749, 0.07507, 0.01929, 0.00095, 0.05987, 0.06327, 0.09056, 0.02758, 0.00978, 0.02360, 0.00150, 0.01974, 0.00074]

# Since django doesn't have backend for redis
# i'm afraid i need to do this ugly thing
r_server_on = True
r_server = redis.StrictRedis(host='localhost', port=6379, db=0)
try:
    response = r_server.ping()
except redis.ConnectionError:
    r_server_on = False

def get_variable(variable_name):
    response = r_server.get(variable_name)
    print("database answer: ", response)
    if response:
        return response.decode('utf-8')

def set_variable(variable_name, variable_value):
    r_server.set(variable_name, variable_value.encode('utf-8'))

# functions for letters manipulation

def rotate_letter(letter, n):
    if letter.isupper():
        start = ord('A')
    elif letter.islower():
        start = ord('a')
    else:
        return letter

    c = ord(letter) - start
    i = (c + n) % 26 + start
    return chr(i)


def rotate_word(word, n):
    res = ''
    for letter in word:
        res += rotate_letter(letter, n)
    return res

# functions for cipher encryption/decryption

def get_entropy(string):
    sum = 0
    ignored = 0

    for letter in string:
        c = ord(letter)
        if(65 <= c and c <= 90):
            sum += math.log(english_freqs[c -65])
        elif(97 <= c and c <= 122):
            sum += math.log(english_freqs[c -97])
        else:
            ignored += 1
    return -sum/math.log(2)/(len(string) - ignored)

def get_all_entropies(string):
    result = []
    for i in range(0,27):
        result.append(tuple((i, get_entropy(rotate_word(string, i)))))
    return result

def break_caesar(string):
    entropies = get_all_entropies(string)
    entropies.sort(key=lambda tup: tup[1])
    return entropies[0][0]
