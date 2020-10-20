package com.planeta.pfum.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.FieldType;
import java.io.Serializable;

/**
 * A AutreDoc.
 */
@Entity
@Table(name = "autre_doc")
@org.springframework.data.elasticsearch.annotations.Document(indexName = "autredoc")
public class AutreDoc implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @org.springframework.data.elasticsearch.annotations.Field(type = FieldType.Keyword)
    private Long id;

    @Column(name = "titre")
    private String titre;

    @Lob
    @Column(name = "data")
    private byte[] data;

    @Column(name = "data_content_type")
    private String dataContentType;

    @ManyToOne
    @JsonIgnoreProperties("documents")
    private EtudiantsExecutif etudiantexec;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitre() {
        return titre;
    }

    public AutreDoc titre(String titre) {
        this.titre = titre;
        return this;
    }

    public void setTitre(String titre) {
        this.titre = titre;
    }

    public byte[] getData() {
        return data;
    }

    public AutreDoc data(byte[] data) {
        this.data = data;
        return this;
    }

    public void setData(byte[] data) {
        this.data = data;
    }

    public String getDataContentType() {
        return dataContentType;
    }

    public AutreDoc dataContentType(String dataContentType) {
        this.dataContentType = dataContentType;
        return this;
    }

    public void setDataContentType(String dataContentType) {
        this.dataContentType = dataContentType;
    }

    public EtudiantsExecutif getEtudiantexec() {
        return etudiantexec;
    }

    public AutreDoc etudiantexec(EtudiantsExecutif etudiantsExecutif) {
        this.etudiantexec = etudiantsExecutif;
        return this;
    }

    public void setEtudiantexec(EtudiantsExecutif etudiantsExecutif) {
        this.etudiantexec = etudiantsExecutif;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof AutreDoc)) {
            return false;
        }
        return id != null && id.equals(((AutreDoc) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "AutreDoc{" +
            "id=" + getId() +
            ", titre='" + getTitre() + "'" +
            ", data='" + getData() + "'" +
            ", dataContentType='" + getDataContentType() + "'" +
            "}";
    }
}
