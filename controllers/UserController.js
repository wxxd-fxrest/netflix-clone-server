const User = require("../models/UserModel");

module.exports.addTolikedMovies = async(req, ans) => {
    try{
        const {email, data} = req.body;
        const user = await User.findOne({email});
        if(user) {
            const {likedMovies} = user; 
            const movieAlreadyLiked = likedMovies.find(({id}) => id === data.id);
            if(!movieAlreadyLiked) {
                await User.findByIdAndUpdate(
                    user.id, 
                    {likedMovies: [...user.likedMovies, data]},
                    {new: true}
                );
            } else return ans.json({msg: "Movie alreadt added to the liked list."});
        } else await User.create({email, likedMovies: [data]});
        return ans.json({msg: "Movie added successfully"});
    } catch(error) {
        return ans.json({msg: "Error adding movie"});
    }
};

module.exports.getLikedMovies = async(req, ans) => {
    try {
        const {email} = req.params; 
        const user = await User.findOne({email});
        if(user) {
            ans.json({mag: "sucess", movies: user.likedMovies});
        } else return ans.json({mag: "User with givern email not found."});
    } catch(error) {
        return ans.json({msg: "Error fetching movie"});
    }
};

module.exports.removeFromLikedMovies = async(req, ans) => {
    try {
        const {email, movieID} = req.body;
        const user = await User.findOne({email});
        if(user) {
            const {likedMovies} = user; 
            const movieIndex = likedMovies.findIndex(({id}) => id === movieID);
            if(!movieIndex) ans.status(400).send({msg: "Movie not found"})
            likedMovies.splice(movieIndex, 1);
                await User.findByIdAndUpdate(
                    user.id, 
                    {likedMovies,},
                    {new: true}
                );
        return ans.json({msg: "Movie Deleted", movies:likedMovies});
        } 
    } catch (error) {
        return ans.json({msg: "Error deleting movie"});
    }
}; 