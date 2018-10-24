package br.com.softplan.controllers;

import java.util.List;
import java.util.Optional;

public interface IGenericController<T, ID> {

	public Optional<T> findById(ID id);

	public List<T> findAll();

	public void deleteById(ID id);

	public void save(T t);
	
	public void update(T t);


}
