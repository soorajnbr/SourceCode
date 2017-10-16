/* Mautic interface */

const got = require('got');
const cred = require('app-root-path').require('config/credentials/mautic');
const Promise = require('bluebird');

class MauticInterface {
	constructor() {
		this.baseUrl = 'https://<link>/api';
		this.authString = `${cred.username}:${cred.password}`;
	}

	test() {
		return got(`${this.baseUrl}/contacts`, {
			auth: this.authString
		});
	}

	createContact(userStuffs) {
		return new Promise((resolve, reject) => {
			got
				.post(`${this.baseUrl}/contacts/new`, {
					auth: this.authString,
					body: JSON.stringify(userStuffs)
				})
				.then(res => {
					if (res.statusCode >= 400)
						return reject({
							status: 'failed',
							resStatusCode: res.statusCode,
							body: res.body
						});
					else return resolve(JSON.parse(res.body).contact.id);
				})
				.catch(err => reject(err));
		});
	}

	addContactToSegment(stuffs) {
		return new Promise((resolve, reject) => {
			got
				.post(
					`${this
						.baseUrl}/segments/${stuffs.segmentId}/contact/add/${stuffs.contactId}`,
				{
					auth: this.authString
				}
				)
				.then(res => {
					if (res.statusCode >= 400)
						return reject({
							status: 'failed',
							resStatusCode: res.statusCode,
							body: res.body
						});
					else return resolve();
				})
				.catch(err => reject(err));
		});
	}

	deleteContact(id) {
		return new Promise((resolve, reject) => {
			got
				.delete(`${this.baseUrl}/contacts/${id}/delete`, {
					auth: this.authString
				})
				.then(res => {
					if (res.statusCode >= 400)
						return reject({
							status: 'failed',
							resStatusCode: res.statusCode,
							body: res.body
						});
					else return resolve();
				})
				.catch(err => reject(err));
		});
	}
}

module.exports = new MauticInterface();
