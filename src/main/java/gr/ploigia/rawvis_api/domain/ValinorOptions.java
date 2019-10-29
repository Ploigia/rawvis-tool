package gr.ploigia.rawvis_api.domain;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A ValinorOptions.
 */
@Entity
@Table(name = "valinor_options")
public class ValinorOptions implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "csv")
    private String csv;

    @Column(name = "x_col")
    private Integer xCol;

    @Column(name = "y_col")
    private Integer yCol;

    @Column(name = "delimiter")
    private String delimiter;

    @Column(name = "grid_size")
    private Integer gridSize;

    @Column(name = "threshold")
    private Integer threshold;

    @Column(name = "x_min")
    private Float xMin;

    @Column(name = "x_max")
    private Float xMax;

    @Column(name = "y_min")
    private Float yMin;

    @Column(name = "y_max")
    private Float yMax;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCsv() {
        return csv;
    }

    public ValinorOptions csv(String csv) {
        this.csv = csv;
        return this;
    }

    public void setCsv(String csv) {
        this.csv = csv;
    }

    public Integer getxCol() {
        return xCol;
    }

    public ValinorOptions xCol(Integer xCol) {
        this.xCol = xCol;
        return this;
    }

    public void setxCol(Integer xCol) {
        this.xCol = xCol;
    }

    public Integer getyCol() {
        return yCol;
    }

    public ValinorOptions yCol(Integer yCol) {
        this.yCol = yCol;
        return this;
    }

    public void setyCol(Integer yCol) {
        this.yCol = yCol;
    }

    public String getDelimiter() {
        return delimiter;
    }

    public ValinorOptions delimiter(String delimiter) {
        this.delimiter = delimiter;
        return this;
    }

    public void setDelimiter(String delimiter) {
        this.delimiter = delimiter;
    }

    public Integer getGridSize() {
        return gridSize;
    }

    public ValinorOptions gridSize(Integer gridSize) {
        this.gridSize = gridSize;
        return this;
    }

    public void setGridSize(Integer gridSize) {
        this.gridSize = gridSize;
    }

    public Integer getThreshold() {
        return threshold;
    }

    public ValinorOptions threshold(Integer threshold) {
        this.threshold = threshold;
        return this;
    }

    public void setThreshold(Integer threshold) {
        this.threshold = threshold;
    }

    public Float getxMin() {
        return xMin;
    }

    public ValinorOptions xMin(Float xMin) {
        this.xMin = xMin;
        return this;
    }

    public void setxMin(Float xMin) {
        this.xMin = xMin;
    }

    public Float getxMax() {
        return xMax;
    }

    public ValinorOptions xMax(Float xMax) {
        this.xMax = xMax;
        return this;
    }

    public void setxMax(Float xMax) {
        this.xMax = xMax;
    }

    public Float getyMin() {
        return yMin;
    }

    public ValinorOptions yMin(Float yMin) {
        this.yMin = yMin;
        return this;
    }

    public void setyMin(Float yMin) {
        this.yMin = yMin;
    }

    public Float getyMax() {
        return yMax;
    }

    public ValinorOptions yMax(Float yMax) {
        this.yMax = yMax;
        return this;
    }

    public void setyMax(Float yMax) {
        this.yMax = yMax;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ValinorOptions)) {
            return false;
        }
        return id != null && id.equals(((ValinorOptions) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "ValinorOptions{" +
            "id=" + getId() +
            ", csv='" + getCsv() + "'" +
            ", xCol=" + getxCol() +
            ", yCol=" + getyCol() +
            ", delimiter='" + getDelimiter() + "'" +
            ", gridSize=" + getGridSize() +
            ", threshold=" + getThreshold() +
            ", xMin=" + getxMin() +
            ", xMax=" + getxMax() +
            ", yMin=" + getyMin() +
            ", yMax=" + getyMax() +
            "}";
    }
}
