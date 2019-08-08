import java.util.LinkedList;
import java.util.HashMap;

public class Network {
private EdgeWeightedGraph network;
private Edge currentEdge;
private static int INTERESTS_TOTAL = 30;    // total number of interests, index = interest ID

// INITIALIZE NETWORK, user is the first-ever user of Day Zero
public Network(Profile user) {
    network = new EdgeWeightedGraph(user);
    currentEdge = null;
}

// ADD NODE TO GRAPH
public EdgeWeightedGraph addUser(Profile user) {
    int interests[] = Profile.getInterests(user);
    int newVertex = network.V(); // Determine the vertex index

    // Iterate through the list of existing profiles on the network
    for (int v = 0; v < network.V(); v++) {
        if (v == Profile.getID(user)) {
            v++;
            continue;
        }
        int commonInterests = 0;
        // Calculate its edge weights with the other node
        Profile other = Profile.getProfileByID(v);                // DID NOT IMPLEMEMENT: This method would get the profile associated with that ID

        for (int i = 0; i < INTERESTS_TOTAL; i++) {
            if (interests[i] == Profile.getInterests(other)[i])
                commonInterests++;
        Edge newEdge = new Edge(Profile.getID(other), Profile.getID(user), commonInterests);            // Create edge object between the two vertices
        network.addEdge(newEdge);                                          // Add edge to network
        }
    // Verify that the graph is a complete graph
    validateNetwork(network);
    return network;
    }
}

// FIND MATCHES for a user for a specific time
public LinkedList<Profile> findMatches(Profile user, int time) {
    // Initilize matches[]
    LinkedList<Profile> matches = new LinkedList();
    MaxPQ<Profile> maxpq = new MaxPQ(network.V() - 1);
    // Start at the given user, add all profiles connected to it to MAXPQ1, sorted by # of interests matched
    for (int v = 0; v < network.V(); v++) {
        if (v == Profile.getID(user)) {
            v++;
            continue;
        }
        Profile other = Profile.getProfileByID(v);
        maxpq.insert(other);

    // Iterate through MAXPQ1, starting at maximum weight
    for (Profile prof : maxpq) {
        if (!Profile.getMatchStatus(prof) && Profile.bothAvailable(user, prof, time)) {
            matches.add(prof);
            Profile.setMatchStatus(prof, true);
            }
        else
            continue;
        }
    }

    return matches;
}

/* Validates that the graph is a complete graph */
private boolean validateNetwork(EdgeWeightedGraph net) {
    // Check each vertex has degree = V
    for (int v = 0; v < net.V(); v++) {
        int degree = net.degree(v);
        if (degree != net.V())
            return false;
    }
    return true;
}

/* REMOVE NODE FROM GRAPH
public EdgeWeightedGraph removeUser(Profile user) {
// Use remove(Object o) or remove(int index) from LinkedList library in removeEdge() from EdgeWeightedGraph.java
} */

}
