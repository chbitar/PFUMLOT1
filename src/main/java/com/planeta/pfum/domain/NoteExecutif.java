package com.planeta.pfum.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.FieldType;
import java.io.Serializable;
import java.time.Instant;

import com.planeta.pfum.domain.enumeration.Semestre;

/**
 * A NoteExecutif.
 */
@Entity
@Table(name = "note_executif")
@org.springframework.data.elasticsearch.annotations.Document(indexName = "noteexecutif")
public class NoteExecutif implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @org.springframework.data.elasticsearch.annotations.Field(type = FieldType.Keyword)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "semestre")
    private Semestre semestre;

    @Column(name = "note_cc_1")
    private Double noteCC1;

    @Column(name = "note_cc_2")
    private Double noteCC2;

    @Column(name = "note_final")
    private Double noteFinal;

    @Column(name = "date")
    private Instant date;

    @ManyToOne
    @JsonIgnoreProperties("noteExecutifs")
    private User user;

    @ManyToOne
    @JsonIgnoreProperties("noteExecutifs")
    private Module module;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Semestre getSemestre() {
        return semestre;
    }

    public NoteExecutif semestre(Semestre semestre) {
        this.semestre = semestre;
        return this;
    }

    public void setSemestre(Semestre semestre) {
        this.semestre = semestre;
    }

    public Double getNoteCC1() {
        return noteCC1;
    }

    public NoteExecutif noteCC1(Double noteCC1) {
        this.noteCC1 = noteCC1;
        return this;
    }

    public void setNoteCC1(Double noteCC1) {
        this.noteCC1 = noteCC1;
    }

    public Double getNoteCC2() {
        return noteCC2;
    }

    public NoteExecutif noteCC2(Double noteCC2) {
        this.noteCC2 = noteCC2;
        return this;
    }

    public void setNoteCC2(Double noteCC2) {
        this.noteCC2 = noteCC2;
    }

    public Double getNoteFinal() {
        return noteFinal;
    }

    public NoteExecutif noteFinal(Double noteFinal) {
        this.noteFinal = noteFinal;
        return this;
    }

    public void setNoteFinal(Double noteFinal) {
        this.noteFinal = noteFinal;
    }

    public Instant getDate() {
        return date;
    }

    public NoteExecutif date(Instant date) {
        this.date = date;
        return this;
    }

    public void setDate(Instant date) {
        this.date = date;
    }

    public User getUser() {
        return user;
    }

    public NoteExecutif user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Module getModule() {
        return module;
    }

    public NoteExecutif module(Module module) {
        this.module = module;
        return this;
    }

    public void setModule(Module module) {
        this.module = module;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof NoteExecutif)) {
            return false;
        }
        return id != null && id.equals(((NoteExecutif) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "NoteExecutif{" +
            "id=" + getId() +
            ", semestre='" + getSemestre() + "'" +
            ", noteCC1=" + getNoteCC1() +
            ", noteCC2=" + getNoteCC2() +
            ", noteFinal=" + getNoteFinal() +
            ", date='" + getDate() + "'" +
            "}";
    }
}
