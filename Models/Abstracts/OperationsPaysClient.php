<?php

abstract class OperationsPaysClient{    
    /**
     * getRowsCreditsByClient
     *
     * @return array
     */
    abstract public function getRowsCreditsByClient(int $icvecliente): array;
    
    /**
     * getRowCredit
     *
     * @param  int $id
     * @return array
     */
    abstract public function getRowSingleCredit(int $idcreditCustomer): ?array;
    
    /**
     * insertRow
     *
     * @param  array $data
     * @return bool
     */
    abstract public function insertRow(array $data): ?array;
    
    /**
     * updateRowByClients
     *
     * @param  int $id
     * @param  array $data
     * @return bool
     */
    abstract public function updateRowByClients(int $id, array $data): ?array;
    
    /**
     * delete
     *
     * @param  int $id
     * @return bool
     */
    abstract public function delete(int $id, int $icvecliente): ?array;

    
    /**
     * updatePaysStatusCustomer
     * Este metodo va a retornar un bool, para el tema del estatus de pago
     * @return bool
     */
    abstract public function updatePaysStatusCustomer(): ?array;
    

    /**
     * readPaysPendingCredit
     * Lectura de pagos pendientes del credito para el cambio de esquema
     * @return array
     */
    abstract public  function readPaysPendingCredit(int $idCredit): ?array;
}