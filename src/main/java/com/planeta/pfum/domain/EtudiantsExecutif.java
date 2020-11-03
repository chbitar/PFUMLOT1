package com.planeta.pfum.domain;
import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.planeta.pfum.domain.enumeration.DiplomeBac;
import com.planeta.pfum.domain.enumeration.Mention;
import com.planeta.pfum.domain.enumeration.Niveau;

/**
 * A EtudiantsExecutif.
 */
@Entity
@Table(name = "etudiants_executif")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class EtudiantsExecutif implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "suffixe")
    private String suffixe;

    @NotNull
    @Column(name = "nom", nullable = false)
    private String nom;

    @NotNull
    @Column(name = "prenom", nullable = false)
    private String prenom;

    @NotNull
    @Column(name = "date_naissance", nullable = false)
    private Instant dateNaissance;

    @NotNull
    @Column(name = "adresse_contact", nullable = false)
    private String adresseContact;

    @Column(name = "ville")
    private String ville;

    @NotNull
    @Column(name = "email", nullable = false)
    private String email;

    @Enumerated(EnumType.STRING)
    @Column(name = "pj_bac")
    private DiplomeBac pjBac;

    @Enumerated(EnumType.STRING)
    @Column(name = "mention")
    private Mention mention;

    @Column(name = "annee_obtention")
    private String anneeObtention;

    @NotNull
    @Column(name = "cin_pass", nullable = false)
    private String cinPass;

    @Column(name = "pays_nationalite")
    private String paysNationalite;

    @Column(name = "pays_residence")
    private String paysResidence;

    @Column(name = "codepostal")
    private String codepostal;

    @Column(name = "province")
    private String province;

    @Column(name = "tel")
    private String tel;

    @Column(name = "deuxieme_tel")
    private String deuxiemeTel;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "niveau")
    private Niveau niveau;
    

    
    @Lob
    @Column(name = "photo", nullable = false)
    private byte[] photo;

    @Column(name = "photo_content_type", nullable = false)
    private String photoContentType;

    @Lob
    @Column(name = "cv")
    private byte[] cv;

    @Column(name = "cv_content_type")
    private String cvContentType;

    @Lob
    @Column(name = "autre_document")
    private byte[] autreDocument;

    @Column(name = "autre_document_content_type")
    private String autreDocumentContentType;

    @Lob
    @Column(name = "attestation_de_travail")
    private byte[] attestationDeTravail;

    @Column(name = "attestation_de_travail_content_type")
    private String attestationDeTravailContentType;

    
    @Lob
    @Column(name = "bacalaureat", nullable = false)
    private byte[] bacalaureat;

    @Column(name = "bacalaureat_content_type", nullable = false)
    private String bacalaureatContentType;

    
    @Lob
    @Column(name = "cin_passport", nullable = false)
    private byte[] cinPassport;

    @Column(name = "cin_passport_content_type", nullable = false)
    private String cinPassportContentType;

    @Lob
    @Column(name = "diplome")
    private byte[] diplome;

    @Column(name = "diplome_content_type")
    private String diplomeContentType;

    @Column(name = "inscriptionvalide")
    private Boolean inscriptionvalide;

    @Column(name = "absent")
    private Boolean absent;

    @OneToOne
    @JoinColumn(unique = true)
    private User user;

    @OneToMany(mappedBy = "etudiantsExecutif")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Absence> absences = new HashSet<>();

    @OneToMany(mappedBy = "etudiantExecutif")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<EspaceEtudiant> espaceEtudiants = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("etudiantsExecutifs")
    private Filiere filiere;

    @ManyToOne
    @JsonIgnoreProperties("etudiantsExecutifs")
    private AnneeInscription anneeInscription;

    @ManyToOne
    @JsonIgnoreProperties("etudiantsExecutifs")
    private ModalitePaiement modalite;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSuffixe() {
        return suffixe;
    }

    public EtudiantsExecutif suffixe(String suffixe) {
        this.suffixe = suffixe;
        return this;
    }

    public void setSuffixe(String suffixe) {
        this.suffixe = suffixe;
    }

    public String getNom() {
        return nom;
    }

    public EtudiantsExecutif nom(String nom) {
        this.nom = nom;
        return this;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getPrenom() {
        return prenom;
    }

    public EtudiantsExecutif prenom(String prenom) {
        this.prenom = prenom;
        return this;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public Instant getDateNaissance() {
        return dateNaissance;
    }

    public EtudiantsExecutif dateNaissance(Instant dateNaissance) {
        this.dateNaissance = dateNaissance;
        return this;
    }

    public void setDateNaissance(Instant dateNaissance) {
        this.dateNaissance = dateNaissance;
    }

    public String getAdresseContact() {
        return adresseContact;
    }

    public EtudiantsExecutif adresseContact(String adresseContact) {
        this.adresseContact = adresseContact;
        return this;
    }

    public void setAdresseContact(String adresseContact) {
        this.adresseContact = adresseContact;
    }

    public String getVille() {
        return ville;
    }

    public EtudiantsExecutif ville(String ville) {
        this.ville = ville;
        return this;
    }

    public void setVille(String ville) {
        this.ville = ville;
    }

    public String getEmail() {
        return email;
    }

    public EtudiantsExecutif email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public DiplomeBac getPjBac() {
        return pjBac;
    }

    public EtudiantsExecutif pjBac(DiplomeBac pjBac) {
        this.pjBac = pjBac;
        return this;
    }

    public void setPjBac(DiplomeBac pjBac) {
        this.pjBac = pjBac;
    }

    public Mention getMention() {
        return mention;
    }

    public EtudiantsExecutif mention(Mention mention) {
        this.mention = mention;
        return this;
    }

    public void setMention(Mention mention) {
        this.mention = mention;
    }
    public Niveau getNiveau() {
        return niveau;
    }

    public EtudiantsExecutif niveau(Niveau niveau) {
        this.niveau = niveau;
        return this;
    }

    public void setNiveau(Niveau niveau) {
        this.niveau = niveau;
    }

    public String getAnneeObtention() {
        return anneeObtention;
    }

    public EtudiantsExecutif anneeObtention(String anneeObtention) {
        this.anneeObtention = anneeObtention;
        return this;
    }

    public void setAnneeObtention(String anneeObtention) {
        this.anneeObtention = anneeObtention;
    }

    public String getCinPass() {
        return cinPass;
    }

    public EtudiantsExecutif cinPass(String cinPass) {
        this.cinPass = cinPass;
        return this;
    }

    public void setCinPass(String cinPass) {
        this.cinPass = cinPass;
    }

    public String getPaysNationalite() {
        return paysNationalite;
    }

    public EtudiantsExecutif paysNationalite(String paysNationalite) {
        this.paysNationalite = paysNationalite;
        return this;
    }

    public void setPaysNationalite(String paysNationalite) {
        this.paysNationalite = paysNationalite;
    }

    public String getPaysResidence() {
        return paysResidence;
    }

    public EtudiantsExecutif paysResidence(String paysResidence) {
        this.paysResidence = paysResidence;
        return this;
    }

    public void setPaysResidence(String paysResidence) {
        this.paysResidence = paysResidence;
    }

    public String getCodepostal() {
        return codepostal;
    }

    public EtudiantsExecutif codepostal(String codepostal) {
        this.codepostal = codepostal;
        return this;
    }

    public void setCodepostal(String codepostal) {
        this.codepostal = codepostal;
    }

    public String getProvince() {
        return province;
    }

    public EtudiantsExecutif province(String province) {
        this.province = province;
        return this;
    }

    public void setProvince(String province) {
        this.province = province;
    }

    public String getTel() {
        return tel;
    }

    public EtudiantsExecutif tel(String tel) {
        this.tel = tel;
        return this;
    }

    public void setTel(String tel) {
        this.tel = tel;
    }

    public String getDeuxiemeTel() {
        return deuxiemeTel;
    }

    public EtudiantsExecutif deuxiemeTel(String deuxiemeTel) {
        this.deuxiemeTel = deuxiemeTel;
        return this;
    }

    public void setDeuxiemeTel(String deuxiemeTel) {
        this.deuxiemeTel = deuxiemeTel;
    }

    public byte[] getPhoto() {
        return photo;
    }

    public EtudiantsExecutif photo(byte[] photo) {
        this.photo = photo;
        return this;
    }

    public void setPhoto(byte[] photo) {
        this.photo = photo;
    }

    public String getPhotoContentType() {
        return photoContentType;
    }

    public EtudiantsExecutif photoContentType(String photoContentType) {
        this.photoContentType = photoContentType;
        return this;
    }

    public void setPhotoContentType(String photoContentType) {
        this.photoContentType = photoContentType;
    }

    public byte[] getCv() {
        return cv;
    }

    public EtudiantsExecutif cv(byte[] cv) {
        this.cv = cv;
        return this;
    }

    public void setCv(byte[] cv) {
        this.cv = cv;
    }

    public String getCvContentType() {
        return cvContentType;
    }

    public EtudiantsExecutif cvContentType(String cvContentType) {
        this.cvContentType = cvContentType;
        return this;
    }

    public void setCvContentType(String cvContentType) {
        this.cvContentType = cvContentType;
    }

    public byte[] getAutreDocument() {
        return autreDocument;
    }

    public EtudiantsExecutif autreDocument(byte[] autreDocument) {
        this.autreDocument = autreDocument;
        return this;
    }

    public void setAutreDocument(byte[] autreDocument) {
        this.autreDocument = autreDocument;
    }

    public String getAutreDocumentContentType() {
        return autreDocumentContentType;
    }

    public EtudiantsExecutif autreDocumentContentType(String autreDocumentContentType) {
        this.autreDocumentContentType = autreDocumentContentType;
        return this;
    }

    public void setAutreDocumentContentType(String autreDocumentContentType) {
        this.autreDocumentContentType = autreDocumentContentType;
    }

    public byte[] getAttestationDeTravail() {
        return attestationDeTravail;
    }

    public EtudiantsExecutif attestationDeTravail(byte[] attestationDeTravail) {
        this.attestationDeTravail = attestationDeTravail;
        return this;
    }

    public void setAttestationDeTravail(byte[] attestationDeTravail) {
        this.attestationDeTravail = attestationDeTravail;
    }

    public String getAttestationDeTravailContentType() {
        return attestationDeTravailContentType;
    }

    public EtudiantsExecutif attestationDeTravailContentType(String attestationDeTravailContentType) {
        this.attestationDeTravailContentType = attestationDeTravailContentType;
        return this;
    }

    public void setAttestationDeTravailContentType(String attestationDeTravailContentType) {
        this.attestationDeTravailContentType = attestationDeTravailContentType;
    }

    public byte[] getBacalaureat() {
        return bacalaureat;
    }

    public EtudiantsExecutif bacalaureat(byte[] bacalaureat) {
        this.bacalaureat = bacalaureat;
        return this;
    }

    public void setBacalaureat(byte[] bacalaureat) {
        this.bacalaureat = bacalaureat;
    }

    public String getBacalaureatContentType() {
        return bacalaureatContentType;
    }

    public EtudiantsExecutif bacalaureatContentType(String bacalaureatContentType) {
        this.bacalaureatContentType = bacalaureatContentType;
        return this;
    }

    public void setBacalaureatContentType(String bacalaureatContentType) {
        this.bacalaureatContentType = bacalaureatContentType;
    }

    public byte[] getCinPassport() {
        return cinPassport;
    }

    public EtudiantsExecutif cinPassport(byte[] cinPassport) {
        this.cinPassport = cinPassport;
        return this;
    }

    public void setCinPassport(byte[] cinPassport) {
        this.cinPassport = cinPassport;
    }

    public String getCinPassportContentType() {
        return cinPassportContentType;
    }

    public EtudiantsExecutif cinPassportContentType(String cinPassportContentType) {
        this.cinPassportContentType = cinPassportContentType;
        return this;
    }

    public void setCinPassportContentType(String cinPassportContentType) {
        this.cinPassportContentType = cinPassportContentType;
    }

    public byte[] getDiplome() {
        return diplome;
    }

    public EtudiantsExecutif diplome(byte[] diplome) {
        this.diplome = diplome;
        return this;
    }

    public void setDiplome(byte[] diplome) {
        this.diplome = diplome;
    }

    public String getDiplomeContentType() {
        return diplomeContentType;
    }

    public EtudiantsExecutif diplomeContentType(String diplomeContentType) {
        this.diplomeContentType = diplomeContentType;
        return this;
    }

    public void setDiplomeContentType(String diplomeContentType) {
        this.diplomeContentType = diplomeContentType;
    }

    public Boolean isInscriptionvalide() {
        return inscriptionvalide;
    }

    public EtudiantsExecutif inscriptionvalide(Boolean inscriptionvalide) {
        this.inscriptionvalide = inscriptionvalide;
        return this;
    }

    public void setInscriptionvalide(Boolean inscriptionvalide) {
        this.inscriptionvalide = inscriptionvalide;
    }

    public Boolean isAbsent() {
        return absent;
    }

    public EtudiantsExecutif absent(Boolean absent) {
        this.absent = absent;
        return this;
    }

    public void setAbsent(Boolean absent) {
        this.absent = absent;
    }

    public User getUser() {
        return user;
    }

    public EtudiantsExecutif user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Set<Absence> getAbsences() {
        return absences;
    }

    public EtudiantsExecutif absences(Set<Absence> absences) {
        this.absences = absences;
        return this;
    }

    public EtudiantsExecutif addAbsence(Absence absence) {
        this.absences.add(absence);
        absence.setEtudiantsExecutif(this);
        return this;
    }

    public EtudiantsExecutif removeAbsence(Absence absence) {
        this.absences.remove(absence);
        absence.setEtudiantsExecutif(null);
        return this;
    }

    public void setAbsences(Set<Absence> absences) {
        this.absences = absences;
    }

    public Set<EspaceEtudiant> getEspaceEtudiants() {
        return espaceEtudiants;
    }

    public EtudiantsExecutif espaceEtudiants(Set<EspaceEtudiant> espaceEtudiants) {
        this.espaceEtudiants = espaceEtudiants;
        return this;
    }

    public EtudiantsExecutif addEspaceEtudiant(EspaceEtudiant espaceEtudiant) {
        this.espaceEtudiants.add(espaceEtudiant);
        espaceEtudiant.setEtudiantExecutif(this);
        return this;
    }

    public EtudiantsExecutif removeEspaceEtudiant(EspaceEtudiant espaceEtudiant) {
        this.espaceEtudiants.remove(espaceEtudiant);
        espaceEtudiant.setEtudiantExecutif(null);
        return this;
    }

    public void setEspaceEtudiants(Set<EspaceEtudiant> espaceEtudiants) {
        this.espaceEtudiants = espaceEtudiants;
    }

    public Filiere getFiliere() {
        return filiere;
    }

    public EtudiantsExecutif filiere(Filiere filiere) {
        this.filiere = filiere;
        return this;
    }

    public void setFiliere(Filiere filiere) {
        this.filiere = filiere;
    }

    public AnneeInscription getAnneeInscription() {
        return anneeInscription;
    }

    public EtudiantsExecutif anneeInscription(AnneeInscription anneeInscription) {
        this.anneeInscription = anneeInscription;
        return this;
    }

    public void setAnneeInscription(AnneeInscription anneeInscription) {
        this.anneeInscription = anneeInscription;
    }

    public ModalitePaiement getModalite() {
        return modalite;
    }

    public EtudiantsExecutif modalite(ModalitePaiement modalitePaiement) {
        this.modalite = modalitePaiement;
        return this;
    }

    public void setModalite(ModalitePaiement modalitePaiement) {
        this.modalite = modalitePaiement;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof EtudiantsExecutif)) {
            return false;
        }
        return id != null && id.equals(((EtudiantsExecutif) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "EtudiantsExecutif{" +
            "id=" + getId() +
            ", suffixe='" + getSuffixe() + "'" +
            ", nom='" + getNom() + "'" +
            ", prenom='" + getPrenom() + "'" +
            ", dateNaissance='" + getDateNaissance() + "'" +
            ", adresseContact='" + getAdresseContact() + "'" +
            ", ville='" + getVille() + "'" +
            ", email='" + getEmail() + "'" +
            ", pjBac='" + getPjBac() + "'" +
            ", mention='" + getMention() + "'" +
            ", anneeObtention='" + getAnneeObtention() + "'" +
            ", cinPass='" + getCinPass() + "'" +
            ", paysNationalite='" + getPaysNationalite() + "'" +
            ", paysResidence='" + getPaysResidence() + "'" +
            ", codepostal='" + getCodepostal() + "'" +
            ", province='" + getProvince() + "'" +
            ", tel=" + getTel() +
            ", deuxiemeTel=" + getDeuxiemeTel() +
            ", photo='" + getPhoto() + "'" +
            ", photoContentType='" + getPhotoContentType() + "'" +
            ", cv='" + getCv() + "'" +
            ", cvContentType='" + getCvContentType() + "'" +
            ", autreDocument='" + getAutreDocument() + "'" +
            ", autreDocumentContentType='" + getAutreDocumentContentType() + "'" +
            ", attestationDeTravail='" + getAttestationDeTravail() + "'" +
            ", attestationDeTravailContentType='" + getAttestationDeTravailContentType() + "'" +
            ", bacalaureat='" + getBacalaureat() + "'" +
            ", bacalaureatContentType='" + getBacalaureatContentType() + "'" +
            ", cinPassport='" + getCinPassport() + "'" +
            ", cinPassportContentType='" + getCinPassportContentType() + "'" +
            ", diplome='" + getDiplome() + "'" +
            ", diplomeContentType='" + getDiplomeContentType() + "'" +
            ", inscriptionvalide='" + isInscriptionvalide() + "'" +
            ", absent='" + isAbsent() + "'" +
            "}";
    }
}
