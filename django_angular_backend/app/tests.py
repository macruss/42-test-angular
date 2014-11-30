from django.core.urlresolvers import reverse
from django.test import TestCase
from django.test.client import Client
from django.test import LiveServerTestCase
from selenium import webdriver



class HttpTest(TestCase):
    def test_home(self):
        c = Client()
        response = c.get(reverse('home'))
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, '42-test-angular')

class MyInfoTest(LiveServerTestCase):

    def setUp(self):
        self.browser = webdriver.PhantomJS()
        self.browser.implicitly_wait(3)

    def tearDown(self):
        self.browser.quit()

    def test_render_info_on_main_page(self):
        myInfo = [
            ('First Name',    'Ruslan'),
            ('Last Name',     'Makarenko'),
            ('Date of birth', '01.12.1986'),
            ('Email',         'ruslan.makarenko@gmail.com'),
            ('Jabber',        'macruss@jabber.kiev.ua')
        ]

        self.browser.get(self.live_server_url)
        heading = self.browser.find_element_by_tag_name('h2')
        self.assertEquals(heading.text, 'My info')

        contact_fields = self.browser.find_elements_by_tag_name('tr')

        for i in range(len(myInfo)):
            name_field = contact_fields[i].find_elements_by_tag_name('td')[0].text
            value = contact_fields[i].find_elements_by_tag_name('td')[1].text

            self.assertEquals(myInfo[i][0], name_field)
            self.assertEquals(myInfo[i][1], value)


class ContactsTest(LiveServerTestCase):
    fixtures = ['initial_data.json']

    def setUp(self):
        self.browser = webdriver.PhantomJS()
        self.browser.implicitly_wait(3)

    def tearDown(self):
        self.browser.quit()


    def test_angular_route(self):
        self.browser.get(self.live_server_url)

        self.assertEqual(self.browser.current_url.split('#')[1], "/main")

        self.browser.find_element_by_link_text('Contacts').click()
        self.assertEqual(self.browser.current_url.split('#')[1], "/contacts")

        heading = self.browser.find_element_by_tag_name('h2')
        self.assertEqual(heading.text, 'Contacts')


    def test_view_contacts(self):
        self.browser.get(self.live_server_url + '#/contacts')

        contacts = self.browser.find_elements_by_css_selector('tbody tr')

        self.assertEqual(len(contacts), 13)
        self.assertIn("Leonard", contacts[2].text)