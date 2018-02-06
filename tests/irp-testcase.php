<?php
/**
 * Base unit test class for Inline Responsive Preview.
 * WP Unit Testing.
 *
 * @package IRP
 */
class IRP_TestCase extends WP_UnitTestCase {

	/**
	 * Setup Testcase.
	 */
	public function setUp() {
		parent::setUp();

		global $irp;
		$this->_cap = $irp;
	}
}
