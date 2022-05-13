const toFixed = (num, place) => `${num}`.slice(0, place);

export const formatFollower = (follower) => {

    if (follower > 1000000) {
        return `${toFixed(follower / 1000000, 3)}m`;
    } else if (follower > 10000) {
        return `${toFixed(follower / 1000, 3)}k`;
    } else {
        return follower;
    }
}