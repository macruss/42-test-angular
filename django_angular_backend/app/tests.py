from django.core.urlresolvers import reverse
from django.test import TestCase
from django.test.client import Client
from django.test import LiveServerTestCase
from selenium import webdriver
from models import Contact


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

class EditContactTest(LiveServerTestCase):
    fixtures = ['initial_data.json']

    def setUp(self):
        self.browser = webdriver.Firefox()
        self.browser.implicitly_wait(3)

    def tearDown(self):
        self.browser.quit()

    def test_link_edit_contact(self):
        self.browser.get(self.live_server_url + '/#/contacts')

        self.browser.find_element_by_css_selector('a[ng-href="#/contacts/1"]').click()

        heading = self.browser.find_element_by_tag_name('h2')
        self.assertEquals(heading.text, 'Edit contact')

    def test_editing_contact(self):
        self.browser.get(self.live_server_url + '/#/contacts/1')

        first_name_field = self.browser.find_element_by_name('cName')
        first_name_field.clear()
        first_name_field.send_keys("Ruslan")

        last_name_field = self.browser.find_element_by_name('cSurname')
        last_name_field.clear()
        last_name_field.send_keys("Makarenko")

        email_field = self.browser.find_element_by_name('cEmail')
        email_field.clear()
        email_field.send_keys("ruslan.makarenko@gmail.com")

        self.browser.find_element_by_name('Submit').click()

        contacts = Contact.objects.all()

        self.assertEqual(contacts[0].first_name, "Ruslan")
        self.assertEqual(contacts[0].last_name, "Makarenko")
        self.assertEqual(contacts[0].email, "ruslan.makarenko@gmail.com")