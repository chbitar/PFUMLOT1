package com.planeta.pfum.domain;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.FieldType;
import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

/**
 * A CalendrierModule.
 */
@Entity
@Table(name = "calendrier_module")
@org.springframework.data.elasticsearch.annotations.Document(indexName = "calendriermodule")
public class CalendrierModule implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @org.springframework.data.elasticsearch.annotations.Field(type = FieldType.Keyword)
    private Long id;

    @Column(name = "libelle")
    private String libelle;

    @Column(name = "date_control_continu_1")
    private Instant dateControlContinu1;

    @Column(name = "date_control_continu_2")
    private Instant dateControlContinu2;

    @OneToMany(mappedBy = "calendrier")
    private Set<EspaceEtudiant> espaceEtudiants = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("calendrierModules")
    private Module module;

    @ManyToOne
    @JsonIgnoreProperties("calendrierModules")
    private AnneeInscription anneeInscription;

    @ManyToMany(mappedBy = "calendriers")
    @JsonIgnore
    private Set<TableauDeBoard> boards = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLibelle() {
        return libelle;
    }

    public CalendrierModule libelle(String libelle) {
        this.libelle = libelle;
        return this;
    }

    public void setLibelle(String libelle) {
        this.libelle = libelle;
    }

    public Instant getDateControlContinu1() {
        return dateControlContinu1;
    }

    public CalendrierModule dateControlContinu1(Instant dateControlContinu1) {
        this.dateControlContinu1 = dateControlContinu1;
        return this;
    }

    public void setDateControlContinu1(Instant dateControlContinu1) {
        this.dateControlContinu1 = dateControlContinu1;
    }

    public Instant getDateControlContinu2() {
        return dateControlContinu2;
    }

    public CalendrierModule dateControlContinu2(Instant dateControlContinu2) {
        this.dateControlContinu2 = dateControlContinu2;
        return this;
    }

    public void setDateControlContinu2(Instant dateControlContinu2) {
        this.dateControlContinu2 = dateControlContinu2;
    }

    public Set<EspaceEtudiant> getEspaceEtudiants() {
        return espaceEtudiants;
    }

    public CalendrierModule espaceEtudiants(Set<EspaceEtudiant> espaceEtudiants) {
        this.espaceEtudiants = espaceEtudiants;
        return this;
    }

    public CalendrierModule addEspaceEtudiant(EspaceEtudiant espaceEtudiant) {
        this.espaceEtudiants.add(espaceEtudiant);
        espaceEtudiant.setCalendrier(this);
        return this;
    }

    public CalendrierModule removeEspaceEtudiant(EspaceEtudiant espaceEtudiant) {
        this.espaceEtudiants.remove(espaceEtudiant);
        espaceEtudiant.setCalendrier(null);
        return this;
    }

    public void setEspaceEtudiants(Set<EspaceEtudiant> espaceEtudiants) {
        this.espaceEtudiants = espaceEtudiants;
    }

    public Module getModule() {
        return module;
    }

    public CalendrierModule module(Module module) {
        this.module = module;
        return this;
    }

    public void setModule(Module module) {
        this.module = module;
    }

    public AnneeInscription getAnneeInscription() {
        return anneeInscription;
    }

    public CalendrierModule anneeInscription(AnneeInscription anneeInscription) {
        this.anneeInscription = anneeInscription;
        return this;
    }

    public void setAnneeInscription(AnneeInscription anneeInscription) {
        this.anneeInscription = anneeInscription;
    }

    public Set<TableauDeBoard> getBoards() {
        return boards;
    }

    public CalendrierModule boards(Set<TableauDeBoard> tableauDeBoards) {
        this.boards = tableauDeBoards;
        return this;
    }

    public CalendrierModule addBoard(TableauDeBoard tableauDeBoard) {
        this.boards.add(tableauDeBoard);
        tableauDeBoard.getCalendriers().add(this);
        return this;
    }

    public CalendrierModule removeBoard(TableauDeBoard tableauDeBoard) {
        this.boards.remove(tableauDeBoard);
        tableauDeBoard.getCalendriers().remove(this);
        return this;
    }

    public void setBoards(Set<TableauDeBoard> tableauDeBoards) {
        this.boards = tableauDeBoards;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof CalendrierModule)) {
            return false;
        }
        return id != null && id.equals(((CalendrierModule) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "CalendrierModule{" +
            "id=" + getId() +
            ", libelle='" + getLibelle() + "'" +
            ", dateControlContinu1='" + getDateControlContinu1() + "'" +
            ", dateControlContinu2='" + getDateControlContinu2() + "'" +
            "}";
    }
}
