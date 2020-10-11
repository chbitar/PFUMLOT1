package com.planeta.pfum.domain;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.FieldType;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A TableauDeBoard.
 */
@Entity
@Table(name = "tableau_de_board")
@org.springframework.data.elasticsearch.annotations.Document(indexName = "tableaudeboard")
public class TableauDeBoard implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @org.springframework.data.elasticsearch.annotations.Field(type = FieldType.Keyword)
    private Long id;

    @Column(name = "tableau_de_board")
    private String tableauDeBoard;

    @ManyToMany
    @JoinTable(name = "tableau_de_board_filier",
               joinColumns = @JoinColumn(name = "tableau_de_board_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "filier_id", referencedColumnName = "id"))
    private Set<Filiere> filiers = new HashSet<>();

    @ManyToMany
    @JoinTable(name = "tableau_de_board_calendrier",
               joinColumns = @JoinColumn(name = "tableau_de_board_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "calendrier_id", referencedColumnName = "id"))
    private Set<CalendrierModule> calendriers = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTableauDeBoard() {
        return tableauDeBoard;
    }

    public TableauDeBoard tableauDeBoard(String tableauDeBoard) {
        this.tableauDeBoard = tableauDeBoard;
        return this;
    }

    public void setTableauDeBoard(String tableauDeBoard) {
        this.tableauDeBoard = tableauDeBoard;
    }

    public Set<Filiere> getFiliers() {
        return filiers;
    }

    public TableauDeBoard filiers(Set<Filiere> filieres) {
        this.filiers = filieres;
        return this;
    }

    public TableauDeBoard addFilier(Filiere filiere) {
        this.filiers.add(filiere);
        filiere.getBoards().add(this);
        return this;
    }

    public TableauDeBoard removeFilier(Filiere filiere) {
        this.filiers.remove(filiere);
        filiere.getBoards().remove(this);
        return this;
    }

    public void setFiliers(Set<Filiere> filieres) {
        this.filiers = filieres;
    }

    public Set<CalendrierModule> getCalendriers() {
        return calendriers;
    }

    public TableauDeBoard calendriers(Set<CalendrierModule> calendrierModules) {
        this.calendriers = calendrierModules;
        return this;
    }

    public TableauDeBoard addCalendrier(CalendrierModule calendrierModule) {
        this.calendriers.add(calendrierModule);
        calendrierModule.getBoards().add(this);
        return this;
    }

    public TableauDeBoard removeCalendrier(CalendrierModule calendrierModule) {
        this.calendriers.remove(calendrierModule);
        calendrierModule.getBoards().remove(this);
        return this;
    }

    public void setCalendriers(Set<CalendrierModule> calendrierModules) {
        this.calendriers = calendrierModules;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof TableauDeBoard)) {
            return false;
        }
        return id != null && id.equals(((TableauDeBoard) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "TableauDeBoard{" +
            "id=" + getId() +
            ", tableauDeBoard='" + getTableauDeBoard() + "'" +
            "}";
    }
}
