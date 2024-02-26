const {
	accessTopics,
	selectArticleById,
	accessArticles,
	accessComments,
	addComment,
	updateArticleVotes,
    selectComment,
    accessUsers,
    selectUserByUsername,
    updateCommentVotes,
    addArticle
} = require("./model");
const apiCEndpointsJSON = require("./endpoints.json");


exports.getStatus = (request, response) => {
	response.status(200).send();
};

exports.getTopics = (request, response) => {
	accessTopics()
		.then((topics) => {
			response.status(200).send({ topics });
		})
		.catch((err) => {
			next(err);
		});
};

exports.getAPI = (request, response) => {
	response.status(200).send(apiCEndpointsJSON);
};

exports.getArticleById = (request, response, next) => {
	const { article_id } = request.params;
	selectArticleById(article_id)
		.then((article) => {
			response.status(200).send({ article });
		})
		.catch((err) => {
			next(err);
		});
};

exports.getArticles = (request, response, next) => {
    const { topic, sort_by, order } = request.query;
    accessArticles(topic, sort_by, order)
        .then((articles) => {
			response.status(200).send({ articles });
		})
		.catch((err) => {
			next(err);
        });
    	
};

exports.getCommentsByArticle = (request, response, next) => {
	const { article_id } = request.params;
	accessComments(article_id)
		.then((comments) => {
			response.status(200).send(comments);
		})
		.catch((err) => {
			next(err);
		});
};

exports.postCommentOnArticle = (request, response, next) => {
	const { article_id } = request.params;
	const { username, body } = request.body;

	addComment({ article_id, username, body })
		.then((comment) => {
			response.status(201).send({ comment });
		})
		.catch((err) => {
			next(err);
		});
};

exports.patchArticleVotes = (request, response, next) => {
	const { article_id } = request.params;
	const newVote = request.body.inc_votes;
	updateArticleVotes(article_id, newVote)
		.then((vote) => {
			response.status(200).send({ vote });
		})
		.catch((err) => {
			next(err);
		});
};

exports.deleteCommentById = (request, response, next) => {
	const { comment_id } = request.params;
	selectComment(comment_id)
        .then((comment) => {
			response.status(204).send(comment);
		})
		.catch((err) => {
			next(err);
		});
};

exports.getUsers = (request, response, next) => {
	accessUsers()
		.then((users) => {
			response.status(200).send({ users });
		})
		.catch((err) => {
			next(err);
		});
};


exports.getUserByUsername = (request, response, next) => {
    const { username } = request.params;
	selectUserByUsername(username)
		.then((user) => {
			response.status(200).send( user );
		})
		.catch((err) => {
			next(err);
		});
};



exports.patchCommentVotes = (request, response, next) => {
	const { comment_id } = request.params;
	const newVote = request.body.inc_votes;
	updateCommentVotes(comment_id, newVote)
		.then((vote) => {
			response.status(200).send({ vote });
		})
		.catch((err) => {
			next(err);
		});
};



exports.postNewArticle = (request, response, next) => {
	const { author, title, body, topic, article_img_url } = request.body;

	addArticle({ author, title, body, topic, article_img_url })
		.then((article) => {
			response.status(201).send({ article });
		})
		.catch((err) => {
			next(err);
		});
};