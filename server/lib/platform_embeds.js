const platforms = {
    youtube: {
        code: `<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/##ID##?controls=0" frameborder="0" title="YouTube embed" allowfullscreen></iframe>`
    },
    soundcloud: {
        code: `<iframe width="100%" height="315" scrolling="no" title="SoundCloud embed" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/##ID##&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>`
    }
};

function returnEmbedWId(platform, id) {
    const pltfrm = platforms[platform];
    const re = /##ID##/;
    return pltfrm.code.replace(re, id);
}

exports.returnEmbedWId = returnEmbedWId;
