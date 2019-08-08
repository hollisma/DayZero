public class Profile {

    private static int INTERESTS_TOTAL = 30;    // total number of interests, index = interest ID
    private int[] interests = new int[INTERESTS_TOTAL];                // interests of the user
    private int id;                         // id associated with the profile, used for network. Can be ith user registered.
    private boolean matched;                // true if user is already in a group
    private static int AVAILABLE_TIMES_TOTAL = 21;
    // AVAILABLE: index is time slot, which is calculated by (day+ slot #-1) (e.g. Monday afternoon coffee = 0 + 2 - 1; Friday dinner = 4*3 + 3 - 1)
    // Updated every time user updates their calendar
    private LinkedList<Profile>[] available = new LinkedList[AVAILABLE_TIMES_TOTAL];

    public Profile(int[] interests) {
        this.interests = interests;
    }

    public boolean bothAvailable(Profile user1, Profile user2, int time) {
        LinkedList<Profile> profiles = available[time];
        if (profiles.contains(user1) && profiles.contains(user2))
            return true;

        return false;
    }

    public static int[] getInterests(Profile user) {
        return user.interests;
    }

    public static int getID(Profile user) {
        return user.id;
    }

    public static boolean getMatchStatus(Profile user) {
        return user.matched;
    }

    public static boolean setMatchStatus(Profile user, boolean bool) {
        user.matched = bool;
    }
}
