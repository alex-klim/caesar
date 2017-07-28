from django.test import TestCase
from django.test import Client
from . import utils

class CaesarTestCase(TestCase):
    # test for database connection
    def test_dbconn(self):
        r_server = utils.redis.StrictRedis(host='localhost', port=6379, db=0)
        self.assertEqual(r_server.ping(), True)

    # test for index view availability
    def test_index_view(self):
        c = Client()
        response = c.get("/")
        self.assertEqual(response.status_code, 200)

    # test for encryption algorithm
    def test_rotate(self):
        word = "Light IT"
        self.assertEqual(utils.rotate_word(word, 1), "Mjhiu JU")

    # test for breaking cipher algorithm
    def test_guess(self):
        word = "Wteewp vteej hpye ez esp dezcp"
        self.assertEqual(utils.rotate_word(word,utils.break_caesar(word)), "Little kitty went to the store")