package gr.ploigia.rawvis_api.service;

import java.util.Arrays;

public class Query {

    private Float[] x;
    private Float[] y;

    public Float[] getX() {
        return x;
    }

    public void setX(Float[] x) {
        this.x = x;
    }

    public Float[] getY() {
        return y;
    }

    public void setY(Float[] y) {
        this.y = y;
    }

    @Override
    public String toString() {
        return "Query{" +
            "x=" + Arrays.toString(x) +
            ", y=" + Arrays.toString(y) +
            '}';
    }
}
