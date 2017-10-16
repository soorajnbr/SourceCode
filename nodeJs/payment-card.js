const { stripe } = require('../app-initializer');
const errSender = require('../errSender');

/**
 * @api {post} /v1/:{admin|xpis}/payment/card Card Payment
 * @apiName Card Payment
 * @apiGroup Payment
 * @apiHeader {String} Authorization `Bearer <jwt_token>`
 * @apiDescription This api contacts [Stripe](https://stripe.com) and returns the result.
 * 
 * @apiParam {Number} amount
 * @apiParam {String} currency
 * @apiParam {String} description
 * @apiParam {String} token
 *
 *  @apiSuccess {String} result result object.
 */
module.exports = (req, res) => {
	req
		.checkBody('amount', 'Invalid Amount')
		.notEmpty()
		.isInt();
	req
		.checkBody('currency', 'Invalid Currency')
		.notEmpty()
		.isCurrency();

	req.checkBody('description', 'Invalid Description').notEmpty();

	req
		.checkBody('token', 'Invalid token')
		.notEmpty()
		.isSToken();

	req
		.getValidationResult()
		.then(result => {
			if (!result.isEmpty()) {
				return Promise.reject(result.array());
			}

			// route logic
			stripe.charges.create(
				{
					amount: req.body.amount,
					currency: req.body.currency,
					description: req.body.description,
					source: req.body.token
				},
				(err, charge) => {
					if (err) {
						return Promise.reject(err);
					}

					// if everything looks fine
					return res.status(200).send({
						result: charge
					});
				}
			);
		})
		.catch(err => errSender(err, res));
};
